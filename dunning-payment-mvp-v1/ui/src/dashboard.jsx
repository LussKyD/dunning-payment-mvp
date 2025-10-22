import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Dashboard(){
  const [stats, setStats] = useState({customers:0,invoices:0,failed:0});
  const [invoices, setInvoices] = useState([]);

  useEffect(()=>{
    async function load(){
      try{
        const c = await axios.get('/api/customers');
        const i = await axios.get('/api/invoices');
        setStats({customers: c.data.customers.length, invoices: i.data.invoices.length, failed: i.data.invoices.filter(inv=>inv.status==='open' || inv.status==='past_due').length});
        setInvoices(i.data.invoices.slice(0,20));
      }catch(e){
        console.error(e);
      }
    }
    load();
  },[]);

  const triggerRetry = async (stripe_invoice_id) => {
    await axios.post('/api/retry', { invoice_id: stripe_invoice_id });
    alert('Retry enqueued for ' + stripe_invoice_id);
  };

  return (
    <div style={{padding:20,fontFamily:'system-ui'}}>
      <h1>Dunning Dashboard — MVP</h1>
      <div style={{display:'flex',gap:20}}>
        <div style={{padding:20,boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>Customers: <strong>{stats.customers}</strong></div>
        <div style={{padding:20,boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>Invoices: <strong>{stats.invoices}</strong></div>
        <div style={{padding:20,boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>Failed: <strong>{stats.failed}</strong></div>
      </div>

      <h2>Recent invoices</h2>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr><th>Invoice</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {invoices.map(inv=>(
            <tr key={inv.id} style={{borderTop:'1px solid #eee'}}>
              <td>{inv.stripe_invoice_id}</td>
              <td>{inv.amount_due}</td>
              <td>{inv.status}</td>
              <td><button onClick={()=>triggerRetry(inv.stripe_invoice_id)}>Retry</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}