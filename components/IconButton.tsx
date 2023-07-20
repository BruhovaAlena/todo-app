import React from 'react';

type IconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button className="btn btn-sm btn-square btn-outline" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
