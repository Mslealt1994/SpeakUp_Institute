import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white/50 border-t border-line">
      <Container className="text-center py-6">
        <p className="text-sm text-gray-medium">
          © {new Date().getFullYear()} SpeakUp Institute. Building in public.
        </p>
      </Container>
    </footer>
  );
}