import usePackage from "../../Hooks/usePackage";

const Gallery = () => {
    
const [packages] = usePackage();
    return (
        <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">📸 Tour Gallery</h2>

        <div className="grid grid-cols-3 gap-2">
            {packages.length > 0 && (
                <>
                    <div className="col-span-1 grid gap-1">
                        <img src={packages[0]?.image} alt="Gallery" className="w-full h-[300px] object-cover rounded-md" />
                        <img src={packages[1]?.image} alt="Gallery" className="w-full h-[300px] object-cover rounded-md" />
                       
                    </div>
                    
                    <div className="col-span-1 grid gap-1">
                    <img src={packages[2]?.image} alt="Gallery" className="w-full h-[200px] object-cover rounded-md" />
                        <img src={packages[3]?.image} alt="Gallery" className="w-full h-[200px] object-cover rounded-md" />
                        <img src={packages[4]?.image} alt="Gallery" className="w-full h-[200px] object-cover rounded-md" />
                    </div>
                    
                    <div className="col-span-1 grid gap-1">
                        <img src={packages[5]?.image} alt="Gallery" className="w-full h-[300px] object-cover rounded-md" />
                        <img src={packages[6]?.image} alt="Gallery" className="w-full h-[300px] object-cover rounded-md" />
                       
                    </div>
                </>
            )}
        </div>
    </div>
    );
};

export default Gallery;