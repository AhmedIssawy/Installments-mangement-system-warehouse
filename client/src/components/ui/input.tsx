const Input = ({
  placeholder,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export { Input };
