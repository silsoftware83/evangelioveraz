import { Button } from "../Button";

export const HeroSection = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen p-4">
        <p className="text-xl italic mb-2">Building Holy and Healthy Lives</p>
        <h1 className="text-7xl font-bold mb-4">The Family</h1>
        <p className="text-4xl mb-8">Love, Care, Share.</p>
        <Button>LEARN MORE</Button>
      </div>
    );
  };