import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import ContactDetails from "@/components/sections/ContactDetails";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с ООО «ПК»: контакты, адрес, форма обратной связи и консультации по услугам консалтинга.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader 
        title="Контакты ООО «ПК»"
        subtitle="Если Вам нужно обсудить проект, задать вопрос или получить консультацию по нашим услугам, заполните форму обратной связи — и мы обязательно свяжемся с Вами в ближайшее время. Или Вы можете обратиться к нам по указанным ниже контактам."
        className="mt-28 md:mt-48 frosted-glass py-16 md:py-20 text-center overflow-hidden"
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="frosted-glass p-8 rounded-card shadow-md">
            <ContactDetails />
          </div>
          <div className="frosted-glass p-8 rounded-card shadow-md">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
