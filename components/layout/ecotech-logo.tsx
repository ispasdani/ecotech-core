/**
 * Brand wordmark: only "ECOTECH CORE" in plain type, no icon.
 */
export function EcotechLogo({
  className = "font-heading text-[21px] font-semibold tracking-[-0.03em]",
}: {
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      ECOTECH CORE
    </span>
  );
}
