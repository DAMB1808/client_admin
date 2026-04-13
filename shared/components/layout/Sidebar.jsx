export const Sidebar = () => {
    const items = [
        { label: "Canchas" },
        { label: "Reservaciones" },
        { label: "Equipos" },
        { label: "Torneos" },
        { label: "Usuarios" },
    ];

    return (
        <aside className="w-60 bg-white min-h-[calc(100vh-4rem)] shadow-md">
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.label}>
                        <div className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-700 hover:bg-gray-100 cursor-pointer">
                         {item.label}
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}