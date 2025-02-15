export default function ErrorMessage({children} : {children: React.ReactNode}) {
    return (
      <div className="text-red-600 p-3 text-sm">
          {children}
      </div>
    )
  }