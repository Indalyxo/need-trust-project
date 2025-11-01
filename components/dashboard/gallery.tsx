export default function GallerySection() {
  const images = [
    {
      id: 1,
      title: "Community Event 2025",
      color: "from-blue-400 to-blue-600",
    },
    { id: 2, title: "Volunteer Day", color: "from-green-400 to-green-600" },
    { id: 3, title: "Project Launch", color: "from-purple-400 to-purple-600" },
    { id: 4, title: "Team Celebration", color: "from-pink-400 to-pink-600" },
    { id: 5, title: "Global Impact", color: "from-orange-400 to-orange-600" },
    { id: 6, title: "Future Vision", color: "from-indigo-400 to-indigo-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Gallery</h1>
        <p className="text-muted-foreground">
          Moments from our journey and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className={`bg-gradient-to-br ${image.color} rounded-lg h-48 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer group`}
          >
            <div className="text-center">
              <p className="text-white font-semibold text-lg group-hover:scale-105 transition-transform">
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
