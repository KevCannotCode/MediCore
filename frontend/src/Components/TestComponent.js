import React from 'react';
import '../styles/TestComponent.css'; // Importing the CSS file for styling

function Test() {
  return (
    <section className="appointments-section mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Appointments Dashboard</h2>
          <span className="text-xs text-gray-500">View all appointments</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="ml-10 space-x-8 lg:ml-40">
          </div>
        </div>
      </div>

      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Dr Name</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Reason For Appointment</th>
                <th className="px-5 py-3">Edit</th>
                <th className="px-5 py-3">Cancel</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {/* Example Row */}
              <tr>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">3</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="whitespace-no-wrap">Besique Monroe</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">Administrator</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">Sep 28, 2022</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
                </td>
              </tr>
              {/* Add more rows similarly */}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">Showing 1 to 5 of 12 Entries</span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
            <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Test;
