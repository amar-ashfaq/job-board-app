type DeleteJobModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

function DeleteJobModal({ isOpen, children }: DeleteJobModalProps) {
  if (!isOpen) return null; // Don’t render anything if not open

  return (
    <div>
      <div>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}
export default DeleteJobModal;
