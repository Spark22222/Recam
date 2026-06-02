import { useNavigate, useParams } from 'react-router';
import { mockClients } from '../data/mockClients';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = mockClients.find((item) => item.id === id);

  if (!client) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-slate-500">Client not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-20 flex items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => navigate('/clients')}
          className="text-slate-400 hover:text-slate-700"
        >
          Client
        </button>

        <span className="text-slate-400">›</span>

        <span className="font-bold text-slate-900">
          {client.firstName} {client.lastName}
        </span>
      </div>

      <form className="mx-auto max-w-3xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Last Name
            </label>
            <input
              type="text"
              value={client.lastName}
              readOnly
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              First Name
            </label>
            <input
              type="text"
              value={client.firstName}
              readOnly
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold text-slate-900">
            Email Address
          </label>
          <input
            type="email"
            value={client.email}
            readOnly
            className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Phone Number
            </label>
            <input
              type="text"
              value={client.phoneNumber}
              readOnly
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Company
            </label>
            <input
              type="text"
              value={client.company}
              readOnly
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Company Logo
          </label>

          <div className="flex h-24 w-24 items-center justify-center rounded-md bg-yellow-300 text-sm font-bold italic text-slate-700">
            {client.companyLogoUrl}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="h-12 w-56 rounded-md bg-[#4C9CE2] text-sm font-semibold text-white transition hover:bg-[#2f8bd8]"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}