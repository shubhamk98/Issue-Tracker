import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div>
      <p className="text-red-500">{children}</p>
    </div>
  );
};

export default ErrorMessage;
