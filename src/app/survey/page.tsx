"use client";
import { sql } from "@vercel/postgres";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

async function saveFormToDatabase(formData: any, userEmail: string) {
  try {
    // First check if user exists and get their ID
    const checkUser = async (email: string) => {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "checkUserExists", email }),
        });
      
        const data = await response.json();
        return data.exists;
      };
      
      const userExists = await checkUser(userEmail);
      if (!userExists) {
        alert("User with this email does not exist!");
        return;
      }

    const getUserId = async (email: string) => {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "getUserId", email }),
        });

        const data = await response.json();
        return data.userId;
    }

    const userId = await getUserId(userEmail);
    console.log("User ID: ", userId);
    console.log("Form Data: ", formData);

    const insertSurvey = async (userId: number, formData: any) => {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "insertSurvey", userId, formData }),
        });

        const data = await response.json();
        return data.message;
    }

    await insertSurvey(userId, formData);

    return true;
  } catch (error) {
    console.error('Error saving to database:', error);
    return false;
  }
}

export default function Survey() {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get('email');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    country: '',
    streetNo: '',
    streetName: '',
    unitApt: '',
    cityTown: '',
    provinceTerritory: '',
    postalCode: '',
    dateOfBirth: '',
    maritalStatus: '',
    employmentStatus: '',
    mainSourceIncome: '',
    totalIncome: '',
    isResident: '',
    hasSin: '',
    sinExpiryDate: ''
  });

  // **Moved Hooks for Date of Birth**
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  // **Moved Hooks for SIN Information**
  const [sinDay, setSinDay] = useState('');
  const [sinMonth, setSinMonth] = useState('');
  const [sinYear, setSinYear] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (field: string, value: {year: string, month: string, day: string}) => {
    const dateStr = `${value.year}-${value.month.padStart(2,'0')}-${value.day.padStart(2,'0')}`;
    setFormData((prev: any) => ({
      ...prev,
      [field]: dateStr
    }));
  };

  const renderAddressForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-400">
          Country *
        </label>
        <input
          type="text"
          id="country"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="streetNo" className="block text-sm font-medium text-gray-400">
            Street Number *
          </label>
          <input
            type="text"
            id="streetNo"
            value={formData.streetNo}
            onChange={(e) => handleInputChange('streetNo', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="streetName" className="block text-sm font-medium text-gray-400">
            Street Name *
          </label>
          <input
            type="text"
            id="streetName"
            value={formData.streetName}
            onChange={(e) => handleInputChange('streetName', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="unitApt" className="block text-sm font-medium text-gray-400">
          Unit/Apt (Optional)
        </label>
        <input
          type="text"
          id="unitApt"
          value={formData.unitApt}
          onChange={(e) => handleInputChange('unitApt', e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="cityTown" className="block text-sm font-medium text-gray-400">
          City/Town *
        </label>
        <input
          type="text"
          id="cityTown"
          value={formData.cityTown}
          onChange={(e) => handleInputChange('cityTown', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="provinceTerritory" className="block text-sm font-medium text-gray-400">
          Province/Territory *
        </label>
        <input
          type="text"
          id="provinceTerritory"
          value={formData.provinceTerritory}
          onChange={(e) => handleInputChange('provinceTerritory', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-400">
          Postal Code *
        </label>
        <input
          type="text"
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderDateOfBirthForm = () => {
    const updateDate = (newDay: string, newMonth: string, newYear: string) => {
      setDobDay(newDay);
      setDobMonth(newMonth);
      setDobYear(newYear);
      handleDateChange('dateOfBirth', {
        year: newYear,
        month: newMonth,
        day: newDay
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="dobDay" className="block text-sm font-medium text-gray-400">
              Day *
            </label>
            <select
              id="dobDay"
              value={dobDay}
              onChange={(e) => updateDate(e.target.value, dobMonth, dobYear)}
              required
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dobMonth" className="block text-sm font-medium text-gray-400">
              Month *
            </label>
            <select
              id="dobMonth"
              value={dobMonth}
              onChange={(e) => updateDate(dobDay, e.target.value, dobYear)}
              required
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dobYear" className="block text-sm font-medium text-gray-400">
              Year *
            </label>
            <select
              id="dobYear"
              value={dobYear}
              onChange={(e) => updateDate(dobDay, dobMonth, e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {[...Array(100)].map((_, i) => {
                const yearVal = String(new Date().getFullYear() - i);
                return <option key={yearVal} value={yearVal}>{yearVal}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderMaritalStatusForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-400">
          Marital Status *
        </label>
        <select
          id="maritalStatus"
          value={formData.maritalStatus}
          onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
    </div>
  );

  const renderEmploymentStatusForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-400">
          Employment Status *
        </label>
        <select
          id="employmentStatus"
          value={formData.employmentStatus}
          onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="student">Student</option>
          <option value="retired">Retired</option>
        </select>
      </div>
    </div>
  );

  const renderIncomeSourceForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="mainSourceIncome" className="block text-sm font-medium text-gray-400">
          Main Source of Income *
        </label>
        <select
          id="mainSourceIncome"
          value={formData.mainSourceIncome}
          onChange={(e) => handleInputChange('mainSourceIncome', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Source</option>
          <option value="salary">Salary</option>
          <option value="business">Business Income</option>
          <option value="investments">Investments</option>
          <option value="pension">Pension</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );

  const renderTotalIncomeForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="totalIncome" className="block text-sm font-medium text-gray-400">
          Total Income (CAD) *
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
          <input
            type="number"
            id="totalIncome"
            value={formData.totalIncome}
            onChange={(e) => handleInputChange('totalIncome', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 pl-8 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderResidentForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Are you a resident of {formData.country} for income tax purposes? *
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              checked={formData.isResident === 'yes'}
              onChange={(e) => handleInputChange('isResident', e.target.value)}
              required
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-400">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              checked={formData.isResident === 'no'}
              onChange={(e) => handleInputChange('isResident', e.target.value)}
              required
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-400">No</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSinForm = () => {
    const updateDate = (newDay: string, newMonth: string, newYear: string) => {
      setSinDay(newDay);
      setSinMonth(newMonth);
      setSinYear(newYear);
      handleDateChange('sinExpiryDate', {
        year: newYear,
        month: newMonth,
        day: newDay
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Do you have a SIN? *
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="yes"
                checked={formData.hasSin === 'yes'}
                onChange={(e) => handleInputChange('hasSin', e.target.value)}
                required
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-400">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="no"
                checked={formData.hasSin === 'no'}
                onChange={(e) => handleInputChange('hasSin', e.target.value)}
                required
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-gray-400">No</span>
          </label>
          </div>
        </div>
        {formData.hasSin === 'yes' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="sinDay" className="block text-sm font-medium text-gray-400">
                SIN Expiry Day
              </label>
              <select
                id="sinDay"
                value={sinDay}
                onChange={(e) => updateDate(e.target.value, sinMonth, sinYear)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sinMonth" className="block text-sm font-medium text-gray-400">
                SIN Expiry Month
              </label>
              <select
                id="sinMonth"
                value={sinMonth}
                onChange={(e) => updateDate(sinDay, e.target.value, sinYear)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sinYear" className="block text-sm font-medium text-gray-400">
                SIN Expiry Year
              </label>
              <select
                id="sinYear"
                value={sinYear}
                onChange={(e) => updateDate(sinDay, sinMonth, e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                {[...Array(10)].map((_, i) => {
                  const yearVal = String(new Date().getFullYear() + i);
                  return <option key={yearVal} value={yearVal}>{yearVal}</option>;
                })}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  const formSteps = [
    { title: 'Address Details', component: renderAddressForm },
    { title: 'Date of Birth', component: renderDateOfBirthForm },
    { title: 'Marital Status', component: renderMaritalStatusForm },
    { title: 'Employment Status', component: renderEmploymentStatusForm },
    { title: 'Income Source', component: renderIncomeSourceForm },
    { title: 'Total Income', component: renderTotalIncomeForm },
    { title: 'Residency Status', component: renderResidentForm },
    { title: 'SIN Information', component: renderSinForm },
  ];

  const handleSubmit = async () => {
    const success = await saveFormToDatabase(formData, userEmail as string);
    if (success) {
      alert('Form submitted successfully!');
      // Reset form or redirect
    } else {
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-8">
          {formSteps[currentStep].title}
        </h1>

        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <form className="space-y-6">
          {formSteps[currentStep].component()}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => setCurrentStep((prev: number) => Math.max(0, prev - 1))}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={currentStep === formSteps.length - 1 ? handleSubmit : () => setCurrentStep((prev: number) => Math.min(formSteps.length - 1, prev + 1))}
              className={`px-4 py-2 rounded-md ${
                currentStep === formSteps.length - 1
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentStep === formSteps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}