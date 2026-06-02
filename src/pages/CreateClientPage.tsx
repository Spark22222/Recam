import { useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';

export default function CreateClientPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');

  const [logoPreview, setLogoPreview] = useState('');
  const [temporaryLogoPreview, setTemporaryLogoPreview] = useState('');

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleOpenLogoModal = () => {
    setTemporaryLogoPreview(logoPreview);
    setIsLogoModalOpen(true);
  };

  const handleSelectLogo = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const logoUrl = URL.createObjectURL(file);
    setTemporaryLogoPreview(logoUrl);
  };

  const handleSaveLogo = () => {
    setLogoPreview(temporaryLogoPreview);
    setIsLogoModalOpen(false);
  };

  const handleCreateClient = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lastName.trim()) {
      setError('Last name is required.');
      return;
    }

    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Phone number is required.');
      return;
    }

    if (!company.trim()) {
      setError('Company is required.');
      return;
    }

    setError('');

    const newClient = {
      id: `client-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      company: company.trim(),
      companyLogoUrl: logoPreview,
    };

    const storedClients = localStorage.getItem('createdClients');
    const createdClients = storedClients ? JSON.parse(storedClients) : [];

    localStorage.setItem(
      'createdClients',
      JSON.stringify([...createdClients, newClient]),
    );

    setIsSuccessModalOpen(true);
  };

  const handleConfirmSuccess = () => {
    setIsSuccessModalOpen(false);
    navigate('/clients');
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-20 flex items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => navigate('/clients')}
          className="text-slate-400 hover:text-slate-700"
        >
          Client
        </button>

        <span className="text-slate-400">›</span>

        <span className="font-bold text-slate-900">Create New Client</span>
      </div>

      <form onSubmit={handleCreateClient} className="mx-auto max-w-3xl">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Client Last Name"
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Client First Name"
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold text-slate-900">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Client Email Address"
            className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Client Phone Number"
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Client Company Name"
              className="h-12 w-full rounded-md bg-slate-100 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Company Logo
          </label>

          <button
            type="button"
            onClick={handleOpenLogoModal}
            className="flex h-24 w-24 items-center justify-center rounded-md bg-slate-100 text-4xl font-light text-slate-400 hover:bg-slate-200"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Company logo preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              '+'
            )}
          </button>
        </div>

        <div className="mt-20 flex justify-center">
          <button
            type="submit"
            className="h-12 w-56 rounded-md bg-[#4C9CE2] text-sm font-semibold text-white transition hover:bg-[#2f8bd8]"
          >
            Create
          </button>
        </div>
      </form>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        className="hidden"
      />

      {isLogoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[520px] rounded-2xl bg-white px-8 py-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <h2 className="flex-1 text-center text-xl font-bold text-slate-900">
                Upload Logo
              </h2>

              <button
                type="button"
                onClick={() => setIsLogoModalOpen(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSelectLogo}
                className="flex h-36 w-36 items-center justify-center rounded-2xl bg-yellow-300 text-3xl font-bold italic text-slate-700"
              >
                {temporaryLogoPreview ? (
                  <img
                    src={temporaryLogoPreview}
                    alt="Selected logo preview"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  '+'
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveLogo}
                disabled={!temporaryLogoPreview}
                className="mt-12 h-12 w-52 rounded-md bg-[#4C9CE2] text-sm font-semibold text-white transition hover:bg-[#2f8bd8] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[640px] rounded-2xl bg-white px-10 py-16 text-center shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              New Client Created Successfully !
            </h2>

            <button
              type="button"
              onClick={handleConfirmSuccess}
              className="mt-10 h-12 w-52 rounded-md bg-[#4C9CE2] text-sm font-semibold text-white transition hover:bg-[#2f8bd8]"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </section>
  );
}