import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      {/* Spacer for scroll room */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg tracking-widest uppercase font-display">
          Keep scrolling to explore
        </p>
      </section>
    </main>
  );
};

export default Index;
