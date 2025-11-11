import { formatReadableDate } from "@/utils/formatReadableDate";
import { Divider, Heading } from "@digdir/designsystemet-react";
import type { LoggedUser } from "@/types/profile";
import MyPosts from "./MyPosts";
import { useTheme } from "@/context/ThemeContext";

interface AccountProp {
  userData: Pick<LoggedUser, "createdAt" | "role" | "messageCount" | "postCount"> | null;
}

const Account = ({ userData }: AccountProp) => {
  const { theme } = useTheme();

  if (!userData) {
    return (
      <>
        <Heading level={2} data-size="lg" className="text-2xl font-bold mb-4">
          Account
        </Heading>
        <p>Ingen brukerdata tilgjengelig.</p>
      </>
    );
  }

  const formatDate = formatReadableDate(userData.createdAt);

  const grayBgAndBorder = "border-stone-300 bg-stone-50";
  const darkGrayBgAndBorder = "border-stone-600 bg-stone-800";

  return (
    <>
      <div className={`border  px-4 py-2 rounded-lg ${theme === "dark" ? darkGrayBgAndBorder : grayBgAndBorder}`}>
        <Heading data-size="sm" level={2}>
          You have sent a total of <strong className="underline">{userData.messageCount}</strong> messages
        </Heading>
      </div>

      <div className={`border  px-4 py-2 rounded-lg ${theme === "dark" ? darkGrayBgAndBorder : grayBgAndBorder}`}>
        <Heading data-size="sm" level={2}>
          You have made <strong className="underline">{userData.postCount}</strong> post(s)
        </Heading>
      </div>

      <MyPosts />

      <Divider />
      <p className="text-gray-400">
        Your account was created at <strong>{formatDate}</strong> (dd.mm.yyyy)
      </p>
    </>
  );
};

export default Account;
