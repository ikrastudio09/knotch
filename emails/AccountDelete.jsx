import { Text } from "@react-email/components";

import EmailLayout from "./EmailLayout";

export default function AccountDeleted({
  customerName,
}) {
  return (
    <EmailLayout title="Account Deleted">

      <Text>
        Hi {customerName},
      </Text>

      <Text>
        Your Knotch account has been deleted successfully.
      </Text>

      <Text>
        We're sorry to see you leave.
      </Text>

      <Text>
        If this action wasn't performed by you,
        please contact support immediately.
      </Text>

    </EmailLayout>
  );
}