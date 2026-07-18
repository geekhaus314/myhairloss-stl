export default function MedicalDisclaimer() {
  return (
    <div className="mt-12 p-6 bg-gray-50 border border-gray-100 text-sm text-[#1a1a1a]/60 leading-relaxed">
      <div className="flex gap-3">
        <svg
          className="w-5 h-5 text-[#1a1a1a]/30 mt-0.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <div>
          <p className="font-bold text-[#1a1a1a] mb-1">Medical Disclaimer</p>
          <p>
            The information provided on this page is for educational and informational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
            physician or other qualified health provider with any questions you may have regarding a medical condition.
            Never disregard professional medical advice or delay in seeking it because of something you have read on
            this website.
          </p>
          <p className="mt-2">
            If you think you may have a medical emergency, call your doctor or 911 immediately.
            MYHAIRLOSS.COM does not recommend or endorse any specific tests, physicians, products, procedures,
            opinions, or other information that may be mentioned on this website.
          </p>
        </div>
      </div>
    </div>
  )
}
