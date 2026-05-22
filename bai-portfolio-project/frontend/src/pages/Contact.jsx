import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { QRCodeCanvas } from "qrcode.react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Facebook,
  MessageCircle,
  Download,
  Loader2,
  Send,
  Link as LinkIcon,
  User,
  MessageSquareText,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [qrValue, setQrValue] = useState("mailto:aimablebyumvuhore@gmail.com");
  const [toast, setToast] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Auto‑hide toast after 4 s
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: "", message: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 📬 Send email via EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ type: "", message: "" });
    setLoading(true);

    try {
      // send parameters to your EmailJS template
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.content,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setToast({
        type: "success",
        message: "✅ Message sent successfully!",
      });
      setForm({ name: "", email: "", content: "" });
    } catch (err) {
      console.error("❌ EmailJS error:", err);
      setToast({
        type: "error",
        message: "⚠️ Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto space-y-12 relative">
      <h1 className="text-3xl font-bold mb-4 text-center dark:text-white flex items-center justify-center gap-2">
        <Mail className="w-7 h-7 text-blue-600" />
        Get in Touch
      </h1>

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-white flex items-center gap-2 transition ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <Send />
          ) : (
            <Loader2 className="animate-spin" />
          )}
          {toast.message}
        </div>
      )}

      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div
          className="p-6 bg-gray-100 dark:bg-gray-800 rounded shadow space-y-4"
          data-aos="fade-right"
        >
          <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Contact Information
          </h2>

          <p className="flex gap-2 text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4 text-blue-500" />
            <a
              href="mailto:aimablebyumvuhore@gmail.com"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              aimablebyumvuhore@gmail.com
            </a>
          </p>

          <p className="flex gap-2 text-gray-700 dark:text-gray-300">
            <Phone className="w-4 h-4 text-green-500" />
            <a
              href="tel:+250796004898"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              +250796004898
            </a>{" "}
            /{" "}
            <a
              href="tel:+250736377629"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              +250736377629
            </a>
          </p>

          <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-purple-600" />
            Socials
          </h3>
          <ul className="space-y-1">
            <li>
              <Github className="inline w-4 h-4" />{" "}
              <a
                href="https://github.com/BYUMVUHOREAimable"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <Facebook className="inline w-4 h-4 text-blue-600" />{" "}
              <a
                href="https://web.facebook.com/byumvuhore.aimable"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <MessageCircle className="inline w-4 h-4 text-indigo-500" />{" "}
              <a
                href="https://discord.com/users/byumvuhoreaimable"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Discord
              </a>
            </li>
          </ul>

          <div className="pt-4">
            <a
              href="/aimable-byumvuhore.vcf"
              download="Aimable-Byumvuhore.vcf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded shadow hover:bg-orange-700"
            >
              <Download className="w-4 h-4" />
              Download vCard
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-100 dark:bg-gray-800 rounded shadow space-y-4"
          data-aos="fade-left"
        >
          <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2 cursor-pointer">
            <Send className="w-5 h-5 text-blue-600" />
            Send me a Message
          </h2>

          <div className="flex items-center border rounded bg-white dark:bg-gray-700">
            <User className="w-5 h-5 ml-2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 bg-transparent outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center border rounded bg-white dark:bg-gray-700">
            <Mail className="w-5 h-5 ml-2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 bg-transparent outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="flex items-start border rounded bg-white dark:bg-gray-700">
            <MessageSquareText className="w-5 h-5 ml-2 mt-2 text-gray-400" />
            <textarea
              name="content"
              placeholder="Message"
              className="w-full p-2 bg-transparent outline-none"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center gap-2 px-4 py-2 text-white font-semibold rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Map */}
      <div data-aos="fade-up">
        <h2 className="text-2xl font-bold dark:text-white mb-4 text-center flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6 text-red-500" />
          My Location (Kigali, Rwanda)
        </h2>
        <div className="w-full h-96 rounded shadow overflow-hidden">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=29.9878%2C-1.9906%2C30.1131%2C-1.8972&layer=mapnik"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Kigali Rwanda Map"
          ></iframe>
        </div>
      </div>

      {/* QR Code */}
      <div className="mt-12 text-center" data-aos="zoom-in">
        <h2 className="text-2xl font-bold dark:text-white mb-6 flex items-center justify-center gap-2">
          <Phone className="w-6 h-6 text-green-600" />
          Quick Scan Contact
        </h2>
        <div className="flex justify-center mb-4">
          <QRCodeCanvas
            value={qrValue}
            size={200}
            bgColor="#ffffff"
            fgColor="#1f2937"
            includeMargin
          />
        </div>
        <div className="flex justify-center gap-4 flex-wrap mb-4">
          <button
            onClick={() => setQrValue("mailto:aimablebyumvuhore@gmail.com")}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            My Email
          </button>
          <button
            onClick={() => setQrValue("tel:+250796004898")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            My Phone
          </button>
          <button
            onClick={() =>
              setQrValue("https://web.facebook.com/byumvuhore.aimable")
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
          <button
            onClick={() => setQrValue("https://github.com/BYUMVUHOREAimable")}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Scan my QR or download my vCard to save contact instantly.
        </p>
      </div>
    </div>
  );
}
