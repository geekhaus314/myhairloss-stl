export default function Contact(){
  return (
    <div style={{padding:24}}>
      <h1>Contact & Booking</h1>
      <p>To receive inquiries directly via email, replace the form action with your Formspree endpoint or your preferred form handler.</p>

      <form action="https://formspree.io/f/your-form-id" method="POST" style={{maxWidth:480}}>
        <label>Name<br/><input name="name" required style={{width:'100%'}}/></label>
        <br/><br/>
        <label>Email<br/><input name="email" type="email" required style={{width:'100%'}}/></label>
        <br/><br/>
        <label>Message<br/><textarea name="message" rows={6} style={{width:'100%'}}></textarea></label>
        <br/><br/>
        <button type="submit">Send</button>
      </form>

      <section style={{marginTop:24}}>
        <h2>Book a consultation</h2>
        <p>Use Calendly, Acuity, or another booking tool. Example: paste your Calendly link here.</p>
        <p><a href="https://calendly.com/">Add booking link</a></p>
      </section>
    </div>
  )
}
