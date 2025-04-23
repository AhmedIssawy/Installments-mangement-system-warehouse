const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export { Card };
