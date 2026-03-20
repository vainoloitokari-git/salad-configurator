export default function Footer() {
  return (
    <footer className="bg-[#A2D135] text-black p-8 mt-12 w-full flex flex-wrap justify-around items-start">

    <div className="min-w-[200px] mb-6">
        <h3 className="font-bold text-lg mb-2">Contact</h3>
        <p>email@example.com</p>
    </div>

      <div className="min-w-[200px] mb-6">
        <h3 className="font-bold text-lg mb-2">Social Media</h3>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>TikTok</p>
      </div>

      <div className="min-w-[200px] mb-6">
        <h3 className="font-bold text-lg mb-2">Branding</h3>
        <p>Company Name</p>
      </div>
    </footer>
  );
}
