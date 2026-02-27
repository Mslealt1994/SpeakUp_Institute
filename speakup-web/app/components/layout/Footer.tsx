import Container from "@/app/components/ui/Container"

export default function Footer() {
  return (
    <footer className="mt-16 bg-white/50 border-t border-gray-100">
      <Container className="text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SpeakUp Institute. Building in public.
        </p>
      </Container>
    </footer>
  )
}