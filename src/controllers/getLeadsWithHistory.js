const pool = require('../config/db');

const getLeadsWithHistory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.id,
        l.lead_name,
        l.company_name,
        l.email,
        l.phone_number,
        l.lead_type,
        l.lead_date,
        lh.date AS history_date,
        lh.next_followup_date,
        lh.remarks AS history_remarks
      FROM 
        leads l
      LEFT JOIN 
        leads_history lh ON l.id = lh.lead_id
      ORDER BY 
        l.id, lh.date
    `);
    const leadsWithHistory = [];
    let currentLead = null;

    result.rows.forEach(row => {
      if (currentLead === null || currentLead.id !== row.id) {
        currentLead = {
          id: row.id,
          lead_name: row.lead_name,
          company_name: row.company_name,
          email: row.email,
          phone_number: row.phone_number,
          lead_type: row.lead_type,
          lead_date: row.lead_date,
          history: []
        };
        leadsWithHistory.push(currentLead);
      }

      if (row.history_date) {
        currentLead.history.push({
          date: row.history_date,
          nextFollowUpDate: row.next_followup_date,
          remarks: row.history_remarks
        });
      }
    });

    res.json(leadsWithHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getLeadsWithHistory,
};
