// CallTable.js
import { formatCallLength, formatCreatedAt } from './Utilities';

export default function CallTable({ calls }) {
  return (
    <div className="w-full max-w-4xl overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-100">
          <tr className="text-left text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">To</th>
            <th className="py-3 px-6 text-center">From</th>
            <th className="py-3 px-6 text-center">Call Length</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6">Call ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {calls.map((call, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-center">{call.to}</td>
              <td className="py-3 px-6 text-center">{call.from}</td>
              <td className="py-3 px-6 text-center">{formatCallLength(call.call_length)}</td>
              <td className="py-3 px-6">{formatCreatedAt(call.created_at)}</td>
              <td className="py-3 px-6">{call.c_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
