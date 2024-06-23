import { useState } from "react";

export default function useIsDeleting() {
  const [isDeleting, setIsDeleting] = useState(false);

  return { isDeleting, setIsDeleting };
}
