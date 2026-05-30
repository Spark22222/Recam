import { useParams } from 'react-router';

export default function OrderDetailPage() {
  const { id } = useParams();

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">Listing Case Detail</h2>
      <p className="mt-2 text-slate-500">Current listing case ID: {id}</p>
    </section>
  );
}