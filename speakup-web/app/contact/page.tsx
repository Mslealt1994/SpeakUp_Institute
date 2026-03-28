import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/contactForm";

export default function ContactPage() {
  return (
    <Container>
      <section
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 md:gap-12 lg:gap-18 py-8 md:py-12 lg:min-h-[85vh]"
        aria-labelledby="contact-title"
      >
        <header className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 id="contact-title">
            Sé parte de la construcción de <span className="text-primary">SpeakUp</span>
          </h1>
          <p className="max-w-prose">
            Estamos diseñando el futuro del aprendizaje lógico en público. Tu
            feedback y tu interés en el Skill Lab impulsan nuestro desarrollo.
            Respondemos personalmente a cada mensaje.
          </p>
        </header>

        <div className="flex items-center w-full">
          <ContactForm />
        </div>
      </section>
    </Container>
  );
}
