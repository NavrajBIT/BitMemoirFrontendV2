export function downloadFile(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    })
    .catch((error) => console.error("Error downloading file:", error));
}
export function isValidNearAddress(address) {
  // Check if the address ends with .near, .mainnet, or .testnet
  const validSuffixes = [".near", ".mainnet", ".testnet"];
  const hasValidSuffix = validSuffixes.some((suffix) =>
    address.endsWith(suffix)
  );

  // Check if the address is exactly 64 characters long (excluding suffixes)
  const hasValidLength = address.length === 64;

  return hasValidSuffix || hasValidLength;
}

export function getTime(serverTime) {
  const datetimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const date = new Date(serverTime);
  const time = date.toLocaleString("en-US", datetimeOptions);

  return time;
}
