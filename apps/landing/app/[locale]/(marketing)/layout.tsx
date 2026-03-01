import { Header, Footer } from "./_components";
import { WhatsAppBlock } from "./_components/whatsapp-block";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <WhatsAppBlock />
      <Footer />
    </>
  );
}
