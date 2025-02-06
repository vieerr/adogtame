import PanelCard from "./PanelCard";
const DogFilter = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content h-full ">
                <PanelCard />
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu min-h-full w-80 p-4">
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Raza</h3>
                        <select defaultValue={"any"} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option value={"any"}>
                                Cualquiera
                            </option>
                            <option>Raza 1</option>
                            <option>Raza 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Edad</h3>
                        <select defaultValue={""} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option  value={""}>
                                Cualquiera
                            </option>
                            <option>Edad 1</option>
                            <option>Edad 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Tamaño</h3>
                        <select defaultValue={""} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option  value={""}>
                                Cualquiera
                            </option>
                            <option>Tamaño 1</option>
                            <option>Tamaño 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Género</h3>
                        <select defaultValue={""} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option  value={""}>
                                Cualquiera
                            </option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </select>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DogFilter;
