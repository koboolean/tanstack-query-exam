import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../util/http.js";

export default function NewEventsSection() {

  // fetch 이벤트를 useQuery로 정의
  const { data, isPending,isError, error } = useQuery({
    //캐싱 처리를 위한 queryKey를 정의한다. 이 값을 이용해 이전에 있던 값을 다시 가져오는 형식이다.
    queryKey:['events', {max : 1}],
    queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}),
    staleTime: 5000,
    gcTime: 30000
  });


  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
        <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch event"}/>
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
