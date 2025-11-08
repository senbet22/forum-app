import { formatReadableDate } from "@/utils/formatReadableDate";
import { Divider, Heading } from "@digdir/designsystemet-react";
import type { LoggedUser } from "@/types/profile";

interface AccountProp {
  userData: Pick<LoggedUser, "createdAt" | "role" | "messageCount" | "postCount"> | null;
}

const Account = ({ userData }: AccountProp) => {
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

  const grayBgAndBorder = "border border-gray-300 bg-gray-500/20 px-4 py-2 rounded-lg";

  return (
    <>
      <div className={grayBgAndBorder}>
        <Heading data-size="sm" level={2}>
          Your role is <strong className="underline">{userData.role}</strong>
        </Heading>
      </div>

      <div className={grayBgAndBorder}>
        <Heading data-size="sm" level={2}>
          You´ve sent a total of <strong className="underline">{userData.messageCount}</strong> messages
        </Heading>
      </div>

      <div className={grayBgAndBorder}>
        <Heading data-size="sm" level={2}>
          You have made <strong className="underline">{userData.postCount}</strong> many post(s)
        </Heading>
      </div>

      <Divider />
      <Heading data-size="sm" level={3} className="text-gray-400">
        Your account was created at <strong>{formatDate}</strong>
      </Heading>
    </>
  );
};

export default Account;
