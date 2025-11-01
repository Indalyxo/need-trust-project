import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DialogHeader } from "../ui/dialog";
import SponsorsForm from "./sponserform";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SponsorsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/sponsors");
        setSponsors(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching sponsors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading sponsors: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Our Sponsors
        </h1>
        <p className="text-muted-foreground">
          Trusted partners supporting our mission
        </p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Sponsor
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sponsor</DialogTitle>
          </DialogHeader>
          <SponsorsForm />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sponsors?.map((sponsor, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">
              <img src={sponsor.imageUrl} alt={sponsor.name} />
            </div>
            <p className="font-semibold text-card-foreground text-sm">
              {sponsor.name}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-card-foreground mb-4">
          Become a Sponsor
        </h3>
        <p className="text-card-foreground/80 mb-6">
          Join our network of sponsors and make a meaningful impact. We offer
          various sponsorship tiers tailored to your organization's goals.
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Contact Us
        </button>
      </div>
    </div>
  );
}
