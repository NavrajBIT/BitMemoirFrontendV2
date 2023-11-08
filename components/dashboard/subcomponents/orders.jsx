import style from "../dashboard.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getTime } from "@/components/subcomponents/scripts/scripts";

const Orders = ({ usedash }) => {
  return (
    <div
      className={style.sectionContainer}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "var(--padding-light)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1rem",
          left: "var(--padding-main)",
          fontSize: "1.5rem",
          color: "var(--primary-50)",
          fontWeight: "700",
        }}
      >
        Orders
      </div>
      {usedash.orders &&
        usedash.orders.length > 0 &&
        usedash.orders.map((order, index) => (
          <OrderCard usedash={usedash} key={"order-" + index} order={order} />
        ))}
    </div>
  );
};

export default Orders;

const OrderCard = ({ usedash, order }) => {
  const router = useRouter();

  let certImage;
  try {
    certImage = order.certificates[0].image;
  } catch {
    certImage = "/icons/imageplaceholder.svg";
  }

  const statusData = {
    pending: { color: "var(--primary-50)", text: "Pending" },
    error: { color: "red", text: "Error" },
    issued: { color: "green", text: "Issued" },
    in_progress: { color: "var(--primary-50)", text: "In Progress" },
  };

  return (
    <div
      className={style.orderCard}
      onClick={() => router.push(`/order/${order.id}`)}
    >
      <Image
        src={certImage !== null ? certImage : "/icons/imageplaceholder.svg"}
        loader={() =>
          certImage !== null ? certImage : "/icons/imageplaceholder.svg"
        }
        alt={"Certificate"}
        width={200}
        height={150}
        style={{
          borderRadius: "var(--border-radius)",
        }}
      />
      <div
        style={{
          color: statusData[order.status]["color"],
          fontSize: "1.25rem",
          padding: "var(--padding-light) 0",
        }}
      >
        {statusData[order.status]["text"]}
      </div>
      <div>Type: {order.type}</div>
      <div>{getTime(order.timestamp)}</div>
    </div>
  );
};
