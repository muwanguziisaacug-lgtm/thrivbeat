"use client"
import { useState, useTransition } from "react";
import { ContactPage } from "../_components/ContactComponent";
import { toast } from "sonner";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic front-end validation
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setSubmitting(true);
    startTransition(async () => {
      const fetchPromise = fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) {
          throw new Error(data?.message || 'Failed to send message.');
        }
        return data;
      });

      toast.promise(fetchPromise, {
        loading: 'Sending message...',
        success: 'Message sent — we will get back to you shortly.',
        error: 'Failed to send message. Please try again.',
      });

      try {
        await fetchPromise;
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        console.error('Contact submit error', err);
      } finally {
        setSubmitting(false);
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    return (
      <ContactPage
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={ formData }
        submitting={submitting}
        pending={isPending}
      />
    );
};

export default Contact;