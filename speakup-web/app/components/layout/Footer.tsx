import Container from "@/app/components/ui/Container"

export default function Footer() {
  return (
    <footer className="border-t bg-white py-8 mt-16">
      <Container>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SpeakUp Institute. Building in public.
        </p>
      </Container>
    </footer>
  )
}