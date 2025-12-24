import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, text: 'hello@soundwave.agency' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'Dubai, UAE' },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
              {t('contact.subtitle')}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
              {t('contact.title')}
            </h2>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{info.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-sm font-medium"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? 'text-xs text-primary top-2'
                        : 'text-muted-foreground top-4'
                    }`}
                    style={{ left: '1rem' }}
                  >
                    {t('contact.form.name')}
                  </motion.label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pt-6 pb-2 px-4 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? 'text-xs text-primary top-2'
                        : 'text-muted-foreground top-4'
                    }`}
                    style={{ left: '1rem' }}
                  >
                    {t('contact.form.email')}
                  </motion.label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pt-6 pb-2 px-4 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? 'text-xs text-primary top-2'
                        : 'text-muted-foreground top-4'
                    }`}
                    style={{ left: '1rem' }}
                  >
                    {t('contact.form.message')}
                  </motion.label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full pt-6 pb-2 px-4 bg-background border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 shadow-glow magnetic-hover"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  {t('contact.form.send')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
