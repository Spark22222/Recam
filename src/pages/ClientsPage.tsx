import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { mockClients } from '../data/mockClients';
import { getCurrentUser } from '../utils/authStorage';
import type { Client } from '../types/client';

const getClientName = (client: Client) => {
    return `${client.firstName} ${client.lastName}`;
};

export default function ClientsPage() {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const getInitialClients = () => {
        const storedClients = localStorage.getItem('createdClients');
        const createdClients = storedClients ? JSON.parse(storedClients) : [];

        return [...mockClients, ...createdClients];
    };
    const [clients, setClients] = useState<Client[]>(getInitialClients);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const keyword = searchTerm.trim().toLowerCase();

    

    const filteredClients = useMemo(() => {
        if (!keyword) {
            return clients;
        }

        return clients.filter((client) => {
            const clientName = getClientName(client).toLowerCase();

            return (
                clientName.includes(keyword) ||
                client.company.toLowerCase().includes(keyword) ||
                client.phoneNumber.toLowerCase().includes(keyword) ||
                client.email.toLowerCase().includes(keyword)
            );
        });
    }, [clients, keyword]);

    const showDropdown = isSearchFocused && Boolean(keyword);
    const hasSearchResults = filteredClients.length > 0;

    const handleCreateClient = () => {
        navigate('/clients/create');
    };

    const handleDeleteClient = (clientId: string) => {
        setClients((prevClients) =>
            prevClients.filter((client) => client.id !== clientId),
        );
        setOpenMenuId(null);
    };

    return (
        <section className="mx-auto max-w-7xl px-6 py-14">
            <h1 className="text-center text-4xl font-bold text-slate-950">
                Hi, Welcome {user?.name || 'User'}!
            </h1>

            <div className="mt-8 flex items-center justify-between gap-8">
                <div className="relative mx-auto w-full max-w-2xl">
                    <div className="flex h-12 w-full items-center rounded-md bg-slate-100 px-4 focus-within:ring-2 focus-within:ring-blue-300">
                        <span className="mr-3 text-slate-400">⌕</span>

                        <input
                            type="text"
                            placeholder="Search from client list"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                    </div>

                    {showDropdown && (
                        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-80 overflow-y-auto rounded-md bg-white py-3 shadow-lg">
                            {hasSearchResults ? (
                                filteredClients.map((client) => (
                                    <button
                                        key={client.id}
                                        type="button"
                                        onMouseDown={() => {
                                            setSearchTerm(getClientName(client));
                                            setIsSearchFocused(false);
                                        }}
                                        className="block w-full px-8 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                                    >
                                        <span className="font-medium text-slate-700">
                                            {getClientName(client)}
                                        </span>{' '}
                                        <span className="text-slate-500">
                                            ( {client.email} )
                                        </span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-8 py-4 text-sm text-slate-500">
                                    No exist client, please try a new one or{' '}
                                    <button
                                        type="button"
                                        onMouseDown={handleCreateClient}
                                        className="font-semibold text-slate-700 underline hover:text-blue-600"
                                    >
                                        Create New Client
                                    </button>
                                    .
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleCreateClient}
                    className="h-12 min-w-48 rounded-md bg-[#4C9CE2] px-6 text-sm font-semibold text-white transition hover:bg-[#2f8bd8]"
                >
                    + Create New Client
                </button>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                        <tr>
                            <th className="px-7 py-4 font-bold">Client Name</th>
                            <th className="px-7 py-4 font-bold">Company</th>
                            <th className="px-7 py-4 font-bold">Number</th>
                            <th className="px-7 py-4 font-bold">Email</th>
                            <th className="px-7 py-4 font-bold"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredClients.map((client, index) => {
                            const shouldOpenUpward = index >= filteredClients.length - 2;
                            return (
                                <tr key={client.id} className="border-t border-slate-100">
                                    <td className="px-7 py-4">{getClientName(client)}</td>
                                    <td className="px-7 py-4">{client.company}</td>
                                    <td className="px-7 py-4">{client.phoneNumber}</td>
                                    <td className="px-7 py-4">{client.email}</td>

                                    <td className="relative px-7 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === client.id ? null : client.id)
                                            }
                                            className="rounded-md px-2 py-1 font-bold hover:bg-slate-100"
                                        >
                                            ...
                                        </button>

                                        {openMenuId === client.id && (
                                            <div
                                                className={`absolute right-6 z-50 w-44 rounded-md bg-white py-2 text-left shadow-lg ${shouldOpenUpward ? 'bottom-10' : 'top-10'
                                                    }`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/clients/${client.id}`)}
                                                    className="block w-full px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-100"
                                                >
                                                    Client Information
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteClient(client.id)}
                                                    className="block w-full px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                {filteredClients.length === 0 && (
                    <div className="py-10 text-center text-sm text-slate-500">
                        No clients found.
                    </div>
                )}
            </div>
        </section>
    );
}