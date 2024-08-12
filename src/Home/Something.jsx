import img2 from '../assests/HomePage.jpg';
export default function Me() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${img2})` }}
        className="w-[100%] h-[91.3vh] bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <div className="font-PlaywriteITModerna text-7xl font-semibold">
          GREETINGS
        </div>
        <div className="font-PlaywriteITModerna text-7xl font-semibold">
          VAIBHAV SINGLA
        </div>
      </div>
    </>
  );
}
