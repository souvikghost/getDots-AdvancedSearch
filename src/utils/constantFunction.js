export const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "i");
  const parts = text.split(regex);


  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
};
