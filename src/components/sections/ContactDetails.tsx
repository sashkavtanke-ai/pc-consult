import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-h4 font-bold text-primary">Контакты ООО «ПК»</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <span>8 981 763 89 00</span>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <span>info@pc-consult.ru</span>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <span>
            194295, г. Санкт-Петербург, Торжковская ул., д. 5 литера А, помещ. 15-н, 27-н ком. 57
          </span>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <iframe
          src="https://yandex.com/map-widget/v1/?um=constructor%3Ac3bef6924c3552ff57d7c855d535cf84a9d846cc76160dcdebfef6e6e0243766&amp;source=constructor"
          width="500"
          height="400"
          frameBorder="0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
