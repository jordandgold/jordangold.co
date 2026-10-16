// Cube from the site favicon, drawn with currentColor so it can be tinted via CSS
function CubeIcon() {
  return (
    <svg
      className="cube-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5Z" />
      <path d="M3.5 7.25 12 12l8.5-4.75M12 12v9.5" />
    </svg>
  );
}

export default CubeIcon;
