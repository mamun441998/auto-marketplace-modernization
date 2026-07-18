import Button from "@/components/ui/Button";

async function getVehicle(id: string) {
    const res = await fetch(
        `http://127.0.0.1:8001/api/vehicles/${id}`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export default async function VehicleDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } =await params;
    const vehicle = await getVehicle(id);
    console.log(vehicle);

    return (
        <main className="max-w-4xl mx-auto p-8">

            <div className="bg-white shadow-lg rounded-xl p-6 border">

                <h1 className="text-4xl font-bold mb-6">
                    {vehicle.data.title}
                </h1>
            

            <div className="mb-6">
                <Button>
                    Contact Dealer
                </Button>
            </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                {vehicle.data.images?.map((image: any) => (
                    <img
                    key={image.id}
                    src={image.image_path}
                    alt={vehicle.data.title}
                    className="w-full h-48 object-cover rounded"
                    />
                ))}
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <strong>Year:</strong> {vehicle.data.year}
                    </div>

                    <div>
                        <strong>Make:</strong> {vehicle.data.make}
                    </div>

                    <div>
                        <strong>Model:</strong> {vehicle.data.model}
                    </div>

                    <div>
                        <strong>Price:</strong> {vehicle.data.price}
                    </div>

                    <div>
                        <strong>Mileage:</strong> {vehicle.data.mileage}
                    </div>

                    <div>
                        <strong>Fuel:</strong> {vehicle.data.fuel_type}
                    </div>

                    <div>
                        <strong>Transmission:</strong> {vehicle.data.transmission}
                    </div>

                    <div>
                        <strong>Status:</strong> {vehicle.data.status}
                    </div>

                    <div className="mt-6">
                        <strong>Dealer:</strong> {vehicle.data.dealer}
                    </div>

                </div>

            </div>

        </main>
    );

}