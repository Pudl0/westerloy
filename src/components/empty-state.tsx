interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center text-westerloySecondary" role="status">
      <p>{message}</p>
    </div>
  );
}
