'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Edit,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';

// Mock billing data
const mockBillingData = {
  currentPlan: {
    name: 'Professional',
    price: 25,
    billingCycle: 'monthly',
    nextBillingDate: '2025-08-31',
    employees: 247,
    totalCost: 6175
  },
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025
  },
  currentUsage: {
    sessions: 1847,
    included: 2000,
    overage: 0,
    overageCost: 0
  },
  upcomingCharges: [
    {
      description: 'Professional Plan - 247 employees',
      amount: 6175,
      date: '2025-08-31'
    },
    {
      description: 'Additional Sessions (0)',
      amount: 0,
      date: '2025-08-31'
    }
  ]
};

const mockInvoices = [
  {
    id: 'INV-2025-07-001',
    date: '2025-07-01',
    amount: 6175,
    status: 'paid',
    description: 'Professional Plan - July 2025',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-06-001',
    date: '2025-06-01',
    amount: 5950,
    status: 'paid',
    description: 'Professional Plan - June 2025',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-05-001',
    date: '2025-05-01',
    amount: 5725,
    status: 'paid',
    description: 'Professional Plan - May 2025',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-04-001',
    date: '2025-04-01',
    amount: 5500,
    status: 'paid',
    description: 'Professional Plan - April 2025',
    downloadUrl: '#'
  }
];

export default function BillingPage() {
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'failed':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <DashboardLayout title="Billing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
            <p className="text-gray-600 mt-1">Manage your subscription, payments, and billing history</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="btn-secondary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </button>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                <button 
                  onClick={() => setShowChangePlan(true)}
                  className="btn-secondary text-sm"
                >
                  Change Plan
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{mockBillingData.currentPlan.name}</h3>
                  <p className="text-gray-600">
                    {formatCurrency(mockBillingData.currentPlan.price)}/employee/month
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(mockBillingData.currentPlan.totalCost)}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockBillingData.currentPlan.employees}</div>
                  <div className="text-sm text-gray-600">Active Employees</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockBillingData.currentUsage.sessions}</div>
                  <div className="text-sm text-gray-600">Sessions This Month</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mockBillingData.currentUsage.included - mockBillingData.currentUsage.sessions}
                  </div>
                  <div className="text-sm text-gray-600">Sessions Remaining</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Next Billing Date</p>
                    <p className="text-sm text-blue-800">
                      {new Date(mockBillingData.currentPlan.nextBillingDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Payment Method */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Edit
                </button>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-6 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">**** **** **** {mockBillingData.paymentMethod.last4}</p>
                  <p className="text-sm text-gray-500">
                    Expires {mockBillingData.paymentMethod.expiryMonth}/{mockBillingData.paymentMethod.expiryYear}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowAddPaymentMethod(true)}
                className="w-full btn-secondary text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            {/* Usage Overview */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sessions Used</span>
                    <span>{mockBillingData.currentUsage.sessions} / {mockBillingData.currentUsage.included}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(mockBillingData.currentUsage.sessions / mockBillingData.currentUsage.included) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {mockBillingData.currentUsage.overage > 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Overage Usage</p>
                        <p className="text-yellow-700">
                          {mockBillingData.currentUsage.overage} sessions - {formatCurrency(mockBillingData.currentUsage.overageCost)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800">Within Limits</p>
                        <p className="text-green-700">No overage charges</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Charges */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Charges</h2>
          
          <div className="space-y-3">
            {mockBillingData.upcomingCharges.map((charge, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{charge.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(charge.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-gray-900">
                  {formatCurrency(charge.amount)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Next Charge</span>
              <span>{formatCurrency(mockBillingData.upcomingCharges.reduce((sum, charge) => sum + charge.amount, 0))}</span>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
            <button className="btn-secondary text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(invoice.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{invoice.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-700 mr-3">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Payment Method</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" className="input-field" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input type="text" className="input-field" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" className="input-field" placeholder="123" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddPaymentMethod(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddPaymentMethod(false)}
                className="btn-primary"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}