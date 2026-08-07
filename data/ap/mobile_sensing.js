export const mobileSensingCourse = {
  id: `mobile-sensing-and-wireless-networking`,
  title: `Mobile Sensing and Wireless Networking`,
  description: `This course explains how a mobile device senses motion and place, and how it communicates over short-range and Internet networks. It develops the ideas from raw sensor readings through indoor localization and collaborative multipath networking, with diagrams and mathematics narrated for screen-reader learners.`,
  level: `Advanced`,
  chapters: [
    {
      id: `mobile-sensing`, title: `Mobile Sensing`, blocks: [
        { type: `text`, text: `A phone is not only a small computer: it is a measuring instrument carried through the world. This chapter introduces sensors, the Android Sensor Framework, and the practical discipline of turning a stream of imperfect measurements into useful application input.` },
        { type: `text`, text: `By the end, you will be able to distinguish a physical measurement from a derived virtual one, choose an Android sensor safely, and understand why location uses a different Android service.` },
        { type: `heading`, text: `What a sensor contributes` },
        { type: `text`, text: `A sensor receives a stimulus, meaning a physical parameter, and converts it to a processable signal. The stimulus might be optical, electrical, mechanical, chemical, or radio-frequency energy. Sensors therefore appear in bodies, vehicles, industrial systems, and phones.` },
        { type: `list`, items: [`Hardware-based sensors are physical components that directly measure an environmental property, such as light, temperature, pressure, proximity, acceleration, magnetic field, or GPS-related location hardware.`, `Software-based, or virtual, sensors derive a useful quantity from one or more hardware sensors; orientation and pedometer functions are examples.`, `On Android, motion sensors include accelerometer, gyroscope, gravity, rotation vector, step counter, and step detector; environmental sensors include light, temperature, humidity, pressure, and proximity; position-related facilities include magnetometer/orientation and separate location services.`] },
        { type: `text`, text: `That classification matters because a derived answer inherits the noise and assumptions of its physical inputs. Ask first what is measured directly, then what inference your application needs.` },
        { type: `heading`, text: `The Android Sensor Framework` },
        { type: `text`, text: `The Android Sensor Framework provides SensorManager, Sensor, SensorEvent, and SensorEventListener, plus constants for sensor types and sampling delays. First obtain the sensor service, then ask which sensors actually exist on this device; availability depends on manufacturer and platform.` },
        { type: `code`, code: `SensorManager manager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
List<Sensor> sensors = manager.getSensorList(Sensor.TYPE_ALL);
Sensor accelerometer = manager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);` },
        { type: `text`, text: `This code illustrates capability discovery, not a promise that every model has every sensor. A null result from getDefaultSensor means the application needs a fallback rather than a crash.` },
        { type: `list`, items: [`Implement onSensorChanged to receive a SensorEvent containing values, timestamp, and accuracy.`, `Implement onAccuracyChanged to react to LOW, MEDIUM, HIGH, or UNRELIABLE reported accuracy.`, `Register the listener for the chosen sensor and unregister it when collection is no longer needed, especially when an activity is paused.`] },
        { type: `text`, text: `A sensor can be streaming or event based. A nonzero minimum delay indicates a streaming sensor; zero indicates event based. Requested delays include NORMAL, about 200,000 microseconds; UI, about 60,000; GAME, about 20,000; and FASTEST, zero requested delay. These are requests, not guaranteed arrival rates.` },
        { type: `heading`, text: `Raw acceleration and gravity` },
        { type: `text`, text: `An accelerometer measures specific force, so a stationary phone normally reports about 9.81 metres per second squared because it is supported against gravity. In free fall it approaches zero. A motion algorithm must separate gravity from linear acceleration.` },
        { type: `code`, code: `final float alpha = 0.8f;
gravity[0] = alpha * gravity[0] + (1 - alpha) * event.values[0];
gravity[1] = alpha * gravity[1] + (1 - alpha) * event.values[1];
gravity[2] = alpha * gravity[2] + (1 - alpha) * event.values[2];
linear[0] = event.values[0] - gravity[0];
linear[1] = event.values[1] - gravity[1];
linear[2] = event.values[2] - gravity[2];` },
        { type: `text`, text: `The low-pass portion changes slowly and estimates gravity. Subtracting that estimate is a high-pass operation that retains faster movement. This simple filter is helpful, but its estimate can be wrong during sustained motion.` },
        { type: `heading`, text: `Steps and location` },
        { type: `text`, text: `Step counter and step detector use ACTIVITY_RECOGNITION permission on Android 10 and later. The counter reports accumulated steps; the detector reports individual step events. Both must be tested on the actual device because sensor availability varies.` },
        { type: `text`, text: `GPS is deliberately not a Sensor.TYPE value. Android handles location through LocationManager and LocationListener, with runtime coarse or fine location permission. requestLocationUpdates supplies a provider, minimum time, minimum distance, and listener; onLocationChanged receives Location objects. This separation reminds us that positioning is a service built from more than a simple sensor event.` },
        { type: `list`, items: [`A sensing app discovers hardware, registers only what it needs, and releases listeners promptly.`, `It records timestamps and accuracy rather than treating values as perfect.`, `It filters and interprets raw measurements before making a behavioral claim such as walking, turning, or arriving.`] },
        { type: `text`, text: `Next we focus on the inertial sensors that turn these raw streams into an estimated trajectory.` }
      ]
    },
    {
      id: `inertial-sensors-and-motion-tracking`, title: `Inertial Sensors and Motion Tracking`, blocks: [
        { type: `text`, text: `Motion sensing becomes difficult the moment we ask where a moving phone went. An inertial measurement unit, or IMU, provides accelerometer, gyroscope, and magnetometer data; this chapter explains why those three readings still do not solve 3D tracking by themselves.` },
        { type: `text`, text: `You will learn the coordinate-frame problem, how orientation converts local readings to Earth coordinates, and why sensor fusion is necessary.` },
        { type: `heading`, text: `The IMU and the trajectory goal` },
        { type: `text`, text: `Diagram description: the pipeline has IMU data at its left, a motion-tracking algorithm in the middle, and a 3D trajectory at its right. A second version adds an initial location. The diagram says that a trajectory is inferred from measured motion plus a starting point, not read directly from a sensor.` },
        { type: `list`, items: [`Accelerometer: three components of linear acceleration in the phone's local axes.`, `Gyroscope: three components of angular velocity, which describe incremental rotation per unit time.`, `Magnetometer: three components of the Earth's magnetic field, used as a heading reference after accounting for distortion.`] },
        { type: `heading`, text: `Rotation changes the frame` },
        { type: `text`, text: `In two dimensions, a 90-degree rotation maps the unit x direction, written as one then zero, to the unit y direction, written as zero then one. The rotation matrix has cosine and sine terms; at 90 degrees it maps x to y and y to negative x. Three-dimensional orientation uses the same idea with a three-by-three rotation matrix.` },
        { type: `text`, text: `The critical issue is that acceleration is reported in the phone's own frame: forward, right, and up relative to its casing. A world trajectory instead needs north, east, and vertical. A forward acceleration means different Earth directions after the phone is rotated.` },
        { type: `heading`, text: `From acceleration to position` },
        { type: `text`, text: `In principle, rotate each local acceleration vector into the global frame, remove gravity, integrate acceleration over time to obtain velocity, and integrate velocity again to obtain displacement. Add displacement to the initial position. Each integration also integrates bias and noise, so small errors grow rapidly.` },
        { type: `text`, text: `Diagram description: a plane has its own forward, right, and up axes, while a second set is north, east, and vertical. The required 3D orientation is the rotation that aligns the first set with the second. This is the bridge from a phone measurement to a map coordinate.` },
        { type: `heading`, text: `Anchors for orientation` },
        { type: `text`, text: `When stationary, gravity identifies down. It determines tilt, two of the three degrees of freedom, because any rotation around the vertical axis leaves gravity unchanged. Magnetic north supplies the missing heading, so gravity plus magnetic field can determine tilt and heading.` },
        { type: `text`, text: `However, during motion the accelerometer contains both gravity and motion acceleration, so its gravity estimate is polluted. The gyroscope can integrate angular velocity from a known initial orientation, but gyro bias causes drift. It is useful over short intervals, not indefinitely.` },
        { type: `heading`, text: `Sensor fusion and the open problem` },
        { type: `text`, text: `Sensor fusion blends complementary weaknesses. During static periods, it relies more heavily on gravity and magnetic north; while moving, it relies more on gyro integration. The accelerometer's gravity direction is the main long-term anchor, while gyro data supplies responsive short-term orientation.` },
        { type: `text`, text: `Diagram description: time alternates between static and moving intervals. The static intervals are labelled gravity plus north; moving intervals are labelled gyro integration. The intended output is a continuously available 3D orientation, not a sudden switch between unrelated estimates.` },
        { type: `list`, items: [`A 3D tracking system needs an initial position, a reliable orientation estimate, gravity removal, and careful numerical integration.`, `If the object rarely becomes still, there is no complete general solution from these phone sensors alone; drift remains an open mobile-computing problem.`, `This limitation motivates external position fixes, beginning with satellites outdoors.`] }
      ]
    },
    {
      id: `gps-and-satellite-positioning`, title: `GPS and Satellite Positioning`, blocks: [
        { type: `text`, text: `Inertial tracking needs reset points. Outdoors, the Global Positioning System, or GPS, provides them by comparing a receiver's clock with satellite transmissions. We will narrate the geometry because the handwritten derivation is a powerful model for later localization.` },
        { type: `heading`, text: `Range from travel time` },
        { type: `text`, text: `A satellite broadcasts information including its position and a transmission time. The receiver notes reception time. Multiplying the time difference by the speed of light gives a measured range, often called a pseudorange because clock error is included.` },
        { type: `text`, text: `Diagram description: three satellites have known coordinates, each connected by a line to a phone at unknown coordinates. Beside each line is the statement: receive time minus transmit time, multiplied by c, the speed of light, equals a range. This is measurement, not yet a location.` },
        { type: `heading`, text: `Trilateration in words` },
        { type: `text`, text: `If the receiver position is x, y, z and satellite one position is x1, y1, z1, its geometric distance is the square root of the sum of three squared coordinate differences. The notes write the same distance equation for satellites two and three. Each measured range defines a sphere centred on one satellite.` },
        { type: `text`, text: `Diagram description: three overlapping circles represent the two-dimensional analogy of those spheres. Each circle is centred on a satellite and has radius equal to its measured range. Their common intersection is the receiver candidate. In full 3D, use spheres rather than circles.` },
        { type: `text`, text: `To solve, form one range equation per satellite and eliminate the squared receiver-coordinate terms by subtracting equations. The remaining linear relationships, together with enough independent measurements, yield position. This is trilateration: location from distances, not triangulation from angles.` },
        { type: `heading`, text: `The fourth unknown: time` },
        { type: `text`, text: `Satellite clocks and receiver clocks are not perfectly synchronized. A one-millisecond timing error corresponds to roughly 300 kilometres at light speed, so an ordinary phone clock cannot be treated as exact. The notes show the true range as measured time difference times c plus a common clock-offset term.` },
        { type: `text`, text: `There are four unknowns: x, y, z, and receiver clock bias. Four satellite measurements provide four equations. The control segment maintains and distributes timing corrections, while satellites update their clocks; the receiver estimates its own bias along with location.` },
        { type: `heading`, text: `Orbits and strengths` },
        { type: `text`, text: `The notes contrast low, medium, and geostationary Earth orbits. GPS uses medium Earth orbit, roughly 20,000 kilometres above Earth, rather than geostationary orbit. Its moving constellation provides geometry and global coverage.` },
        { type: `list`, items: [`GPS provides an absolute outdoor reference that can reset inertial drift.`, `Its calculation relies on propagation time, known satellite positions, and a clock-bias estimate.`, `Buildings obstruct and reflect satellite signals, which leads directly to the indoor localization problem.`] }
      ]
    },
    {
      id: `indoor-localization-problem`, title: `Indoor Localization: The Problem`, blocks: [
        { type: `text`, text: `Satellite positioning illustrates elegant distance geometry, but indoor walls change the problem. This chapter defines the main alternatives and the requirements that make an indoor system hard to deploy as well as hard to calculate.` },
        { type: `heading`, text: `Why GPS is weak indoors` },
        { type: `text`, text: `Diagram description: a satellite sends a direct path toward a phone and another path that reflects from a wall before reaching it. Indoors, the direct line of sight may be blocked and reflected copies arrive later. Thus the signal may fail to penetrate walls or may report a misleading travel time.` },
        { type: `text`, text: `An indoor system must work at room or aisle scale, where a few metres can mean a different room. It should therefore handle multipath, limited line of sight, changing people and furniture, and device variation.` },
        { type: `heading`, text: `Infrastructure choices` },
        { type: `list`, items: [`GPS localization uses satellites and is poor indoors.`, `Wi-Fi localization uses access points already present in many buildings, often through received signal strength or fingerprints.`, `Beacon localization uses deliberately installed sound or Bluetooth beacons and listeners, which can provide useful landmarks but add installation and maintenance cost.`] },
        { type: `text`, text: `Diagram description: one sketch labels a sound beacon and listener; another labels a Bluetooth beacon. Both draw a transmitter and a receiving phone. The key comparison is not visual appearance: installed emitters create known reference points, whereas ordinary Wi-Fi may reuse existing infrastructure.` },
        { type: `heading`, text: `Two major measurement families` },
        { type: `text`, text: `Range-based localization converts a physical measurement such as time of flight, angle, or signal attenuation into distance, then intersects geometric constraints. It is appealing when the propagation model is dependable, but indoor radio propagation often is not.` },
        { type: `text`, text: `Fingerprinting first surveys selected locations. At each location it records a vector of received signal strengths from visible access points. Later, a phone compares its live vector with the stored database and chooses the nearest fingerprint or averages the k nearest neighbours.` },
        { type: `text`, text: `Diagram description: a table has rows labelled locations and columns labelled access points AP1 through AP4. Each cell contains an RSSI value, a received signal strength indicator. A new row from the phone is compared with recorded rows. The best match estimates the location.` },
        { type: `heading`, text: `Why fingerprinting is costly` },
        { type: `text`, text: `The notes identify four limitations: access-point locations or fingerprints change, measurements are device dependent, radio conditions are environment dependent, and surveying is expensive in labour and time. A new building layout can therefore require another wardriving or calibration pass.` },
        { type: `text`, text: `This is the central trade-off: fingerprints exploit multipath instead of modelling it, but the database represents a particular building and time. The next chapter studies RADAR, a foundational Wi-Fi system that combines both empirical and propagation-model approaches.` },
        { type: `list`, items: [`Indoor localization is a sensing and deployment problem, not just geometry.`, `RSSI means received signal strength indicator; it is useful as a pattern but unreliable as a universal distance ruler.`, `A practical design must state its infrastructure, calibration, accuracy, energy, and maintenance costs.`] }
      ]
    },
    {
      id: `radar-rf-indoor-localization`, title: `RADAR: RF-Based Indoor Localization`, blocks: [
        { type: `text`, text: `RADAR asks a useful question: can the Wi-Fi network that carries data also locate its users? It combines overlapping wireless coverage, measured signal strengths, and a model of radio propagation to estimate an indoor position.` },
        { type: `text`, text: `By the end, you will understand its two estimators, why its offline survey helps, and why the same multipath that troubles distance estimation can become a location signature.` },
        { type: `heading`, text: `Radio paths and RSSI` },
        { type: `text`, text: `Diagram description: a transmitter and receiver are joined by a direct path and several reflected paths from walls or surfaces. A second drawing shows a transmitted waveform and a received waveform made of overlapping delayed copies. Reflection and interference make received signal strength vary strongly with position.` },
        { type: `text`, text: `The notes express received signal strength as a sum of contributions from paths. A direct path and reflected paths can reinforce when their phases align or cancel when they oppose. This is multipath fading, and it explains why distance alone is not a stable RSSI predictor indoors.` },
        { type: `heading`, text: `RADAR's building-wide setup` },
        { type: `text`, text: `RADAR places Wi-Fi base stations so their coverage overlaps. A client reports the received signal strength from multiple access points. The system compares that multi-access-point observation with either a propagation prediction or an empirical radio map.` },
        { type: `text`, text: `Diagram description: a floor area contains four access points near or outside its edges and a user at an interior point. From the user, lines lead to the access points, each labelled with an RSSI measurement. The ordered collection of all strengths is the user's RF fingerprint.` },
        { type: `heading`, text: `Empirical nearest-neighbour estimation` },
        { type: `text`, text: `During calibration, RADAR records signal-strength vectors at known sample locations. At runtime, it computes the difference between the live vector and each stored vector, then selects the nearest neighbour in signal space. A stronger version averages the locations of the k nearest neighbours, reducing sensitivity to one noisy match.` },
        { type: `text`, text: `Diagram description: a fingerprint table lists locations in one column and RSSI readings from AP1 through AP4 in later columns. The live observation is compared with every stored row. The nearest row, or a weighted group of nearest rows, maps back to a physical position.` },
        { type: `heading`, text: `Propagation-model estimation` },
        { type: `text`, text: `RADAR also estimates distance from a path-loss model: received power falls as transmitter-receiver separation grows, with an attenuation factor adjusted for walls. For each access point, turn the measured RSSI into an approximate distance; then seek the position whose distances best agree with all access points.` },
        { type: `text`, text: `Diagram description: circles centred on several access points represent their inferred ranges. The intended position lies near the shared intersection, but the circles do not meet perfectly because RSSI and propagation models are noisy. The algorithm chooses the best compromise, not a magically exact crossing.` },
        { type: `heading`, text: `What the paper established` },
        { type: `text`, text: `The RADAR paper used overlapping wireless-LAN coverage and both empirical measurement and modelling. It reported location estimates within a few metres with high probability. Its contribution is the operational lesson: the network can supply localization as an added service, but empirical calibration generally copes with a particular building's RF complexity better than a simple model.` },
        { type: `list`, items: [`RSSI fingerprints treat multipath as a distinctive place signature.`, `Propagation models provide a geometric estimate but are sensitive to environmental assumptions.`, `RADAR's calibration burden leads to the next idea: learn usable indoor landmarks without wardriving.`] }
      ]
    },
    {
      id: `unloc-unsupervised-indoor-localization`, title: `Unloc: Unsupervised Indoor Localization`, blocks: [
        { type: `text`, text: `UnLoc attacks RADAR's survey cost. Instead of pre-labelling every radio fingerprint, it lets naturally recurring sensor patterns emerge as indoor landmarks and uses them to correct dead reckoning.` },
        { type: `heading`, text: `The landmark insight` },
        { type: `text`, text: `An elevator can create a characteristic acceleration and pressure pattern; a corridor turn can create a repeatable motion pattern; a location can have an unusual magnetic field or Wi-Fi set. UnLoc calls these internal landmarks because they can reset a trajectory much as stars once corrected a navigator's dead reckoning.` },
        { type: `text`, text: `Diagram description: an estimated path drifts away from the actual path. At a detected landmark, the estimate is corrected toward the true path. The point is not that dead reckoning is accurate forever; it is that occasional recognizable reset points restrain its accumulated error.` },
        { type: `heading`, text: `Two kinds of landmarks` },
        { type: `list`, items: [`Seed landmarks are structures that force predictable behaviour: stairs, elevators starting and stopping, escalators, and building entrances where indoor and outdoor conditions change.`, `Organic landmarks are ambient signatures: a magnetic domain caused by nearby metal or a distinctive set of overheard Wi-Fi access points.`, `A landmark need only be unique within its Wi-Fi area, not unique in the entire building.`] },
        { type: `heading`, text: `From raw readings to discovered places` },
        { type: `text`, text: `UnLoc begins with a rough dead-reckoned location and raw inertial, magnetic, and Wi-Fi data. It extracts features from a time window, such as an acceleration shape, pressure change, magnetic variation, or RSSI vector. It clusters similar feature vectors in sensor space. Dense repeated clusters become candidate landmarks.` },
        { type: `text`, text: `Diagram description: a pipeline reads raw sensor data plus rough location, then feature extraction, then clustering in sensor space, then landmarks. A multi-sensor version combines inertial, magnetic, and Wi-Fi features. The output is a landmark identity and a growing estimate of where it occurs.` },
        { type: `heading`, text: `Recursive co-localization` },
        { type: `text`, text: `A user trace may initially be inaccurate, so landmark position cannot be trusted from one visit. UnLoc recursively combines many users' dead-reckoned traces and repeated landmark observations. Errors from separate traces are not perfectly correlated; as observations accumulate, landmark and user estimates improve together.` },
        { type: `text`, text: `Diagram description: the process loops from unique sensor fingerprint to find landmark location, update landmark list, and use landmarks to dead reckon later users. Two error labels, user-location error and landmark-location error, feed the same recursive loop. Landmarks gradually grow from uncertain to useful anchors.` },
        { type: `heading`, text: `Evidence and limits` },
        { type: `text`, text: `The paper evaluated UnLoc in three indoor settings, including buildings and a shopping mall, without wardriving or floor plans. It reported median error around 1.69 metres; the lecture reports 1.63 metres at the 50th percentile over 8,000 square metres. The exact number is less important than the demonstrated trade-off: useful accuracy with no deployed infrastructure and no calibration survey.` },
        { type: `list`, items: [`Dead reckoning supplies continuity between resets.`, `Clustering lets landmark patterns emerge rather than requiring a hand-written catalogue.`, `Crowd traces progressively improve both landmark locations and user locations.`] }
      ]
    },
    {
      id: `nericell-road-traffic-monitoring`, title: `Nericell: Monitoring Road and Traffic Conditions`, blocks: [
        { type: `text`, text: `Nericell carries mobile sensing from indoor rooms to busy roads. It uses phones already carried by travellers to detect road quality, braking, congestion, and honking without special roadside equipment.` },
        { type: `heading`, text: `Why rich road sensing` },
        { type: `text`, text: `For varied urban traffic, average speed alone misses potholes, bumps, diverse vehicle types, abrupt braking, and liberal honking. Nericell's goal is to aggregate such signals so a route could avoid stressful roads and intersections.` },
        { type: `list`, items: [`Accelerometer supports drive quality, braking, bumps, potholes, and pedestrian-versus-traffic inference.`, `Microphone supports honk detection but raises energy and privacy concerns.`, `GSM radio and GPS supply location; the system uses them selectively to save energy.`] },
        { type: `heading`, text: `Virtual reorientation` },
        { type: `text`, text: `A phone's x, y, z axes are not necessarily a car's forward, lateral, and vertical axes. Nericell estimates the rotation between them, then virtually reorients readings into the vehicle frame. It also ignores intervals of active phone handling, which are not road motion.` },
        { type: `text`, text: `Diagram description: one coordinate frame is fixed to the phone and another to the vehicle. A rotation transforms phone readings into vehicle X, Y, Z. This makes a forward braking signal meaningful even when users place phones in different orientations.` },
        { type: `heading`, text: `Road events from acceleration` },
        { type: `text`, text: `For braking, compute the mean forward-axis acceleration over a sliding time window. If it exceeds a chosen threshold in the braking direction, declare a braking event. This inexpensive alternative was compared with GPS-based speed change, which costs far more power.` },
        { type: `text`, text: `For potholes at high speed, look for a significant vertical-axis spike. At low speed, look for a sustained vertical dip instead. Pedestrian motion differs from stop-and-go traffic through the amplitude and frequency of acceleration surges and the lack of a persistent vehicle-like surge.` },
        { type: `heading`, text: `Horns, location, and energy` },
        { type: `text`, text: `The honk detector applies a discrete Fourier transform to 100-millisecond audio windows and seeks spectral spikes in roughly 2.5 to 4 kilohertz, at five to ten times the mean. It is triggered when accelerometer evidence suggests braking, reducing microphone use.` },
        { type: `text`, text: `For a detected bump, Nericell can use low-cost GSM tower information: associate the strongest tower ID with an average latitude and longitude. Several reports in one vicinity can trigger GPS on other phones for a more precise fix. The lecture gives a 130-metre median GSM error and says GPS ran only 3.2 percent of one 20-kilometre example drive.` },
        { type: `heading`, text: `Triggered sensing as a design pattern` },
        { type: `text`, text: `Leave cheap accelerometer and GSM sensing on; activate costly GPS or microphone only after a relevant event. Examples are accelerometer to GPS for reorientation, GSM to GPS for localization, and accelerometer to audio for honks. On the measured iPAQ setup, triggered sensing reduced battery life by only 9.7 percent over four hours.` },
        { type: `text`, text: `The Nericell paper evaluated its sensing on Bangalore roads and emphasized arbitrary phone orientation, energy-aware localization, and heterogeneous traffic. Its results were promising rather than a claim of perfect ground truth; bump false negatives remained difficult to assess.` },
        { type: `list`, items: [`First choose the cheap, always-on signal.`, `Use a clear event rule and acknowledge noise and ground-truth limits.`, `Escalate to expensive sensing only when its extra accuracy is worth energy and privacy cost.`] }
      ]
    },
    {
      id: `writing-in-the-air-with-phones`, title: `Writing in the Air with Phones`, blocks: [
        { type: `text`, text: `PhonePoint Pen turns an accelerometer into a pen held in the air. It is a helpful case study because it exposes the gap between a promising sensor stream and a reliable user interface.` },
        { type: `heading`, text: `The intended experience` },
        { type: `text`, text: `The system aims for quick, always-carried, sketchable, searchable notes: hold a Nokia N95 like a pen, write short text or a simple drawing in air, decode it, and email the result. Motivations include on-the-fly notes, nonstandard sketches, assistive communication, and emergency work.` },
        { type: `heading`, text: `Five signal-processing obstacles` },
        { type: `list`, items: [`Without a gyroscope, rotation is ambiguous; the proposal uses a non-rotating grip and estimates orientation during pauses.`, `Hand vibration produces jitter; a moving average over seven samples smooths it and values below 0.5 are suppressed as noise.`, `Integrating acceleration to displacement accumulates error; when a moving window indicates a pause, velocity is reset to zero between strokes.`, `A pen lift can distinguish A from a triangle; a z-axis impulse, pause, and direction change are clues.`, `Character boundaries are ambiguous; a dot gesture, a longer pause, or a leftward motion can delimit characters.`] },
        { type: `text`, text: `Diagram description: raw acceleration while drawing a rectangle is a noisy three-axis trace. After moving-average smoothing and background suppression, the velocity trace is cleaner; after drift control, the reconstructed path becomes a recognizable rectangle. Each stage removes a specific failure source before recognition.` },
        { type: `heading`, text: `Stroke and character recognition` },
        { type: `text`, text: `The system detects pauses using running variance: low variance means the phone is comparatively still. It maps motion into six basic strokes, then uses a stroke grammar, a tree of valid stroke sequences, to recognize letters. Extra motion direction and relative stroke size resolve confusions such as O versus S and D versus P.` },
        { type: `text`, text: `Diagram description: a grammar tree branches through allowed stroke sequences toward letters. It represents recognition as constrained parsing: a partial stroke sequence narrows which letters remain possible, rather than comparing every drawing with every possible shape.` },
        { type: `heading`, text: `Words and controls` },
        { type: `text`, text: `Word recognition adds spelling correction. Ordinary edit distance can offer several close words; a PhonePoint-aware correction gives higher preference to letter confusions the system actually makes, such as M and the strokes interpreted as N plus I. Controls include long horizontal motion or two dots for a word boundary, four brisk shakes for delete, and a check mark to email.` },
        { type: `heading`, text: `Evaluation and honest boundaries` },
        { type: `text`, text: `The prototype used server-side MATLAB signal processing and a simplified on-phone Python version. Ten student participants produced about 83 to 85 percent human readability; character recognition was 91.9 percent for trained users and 78.2 percent for novices. Average letter time was about 3.02 to 4.3 seconds.` },
        { type: `text`, text: `The paper reports 91.9 percent average character identification when users follow constraints, but patient trials exposed barriers: press-to-start controls, large arm motions, coordination, and device familiarity. The lecture appropriately notes limited participants, server-side processing, uncertain ground truth, and slow real-world entry as limitations.` },
        { type: `list`, items: [`Air writing requires filtering, segmentation, geometry reconstruction, and language-aware recognition.`, `A high accuracy number is meaningful only with its user population, training, task, and processing location.`, `Better gyroscopes and modern sequence models may help, but accessibility must be tested with intended users rather than assumed.`] }
      ]
    },
    {
      id: `wireless-communication-background`, title: `Wireless Communication Background`, blocks: [
        { type: `text`, text: `Before comparing Wi-Fi and Bluetooth, we need a small vocabulary for shared radio channels. This chapter explains waves, bandwidth, interference, and why wireless senders need coordination.` },
        { type: `heading`, text: `Signal, frequency, and bandwidth` },
        { type: `text`, text: `A radio transmitter changes a carrier wave to convey information; a receiver estimates those changes despite noise. Frequency is cycles per second in hertz. Higher frequency does not automatically mean better: propagation, available spectrum, antenna design, and regulation all matter.` },
        { type: `text`, text: `Diagram description: a sinusoidal transmitted waveform is shown over time. A receiver sees multiple delayed, weaker copies. Their sum has peaks and dips instead of the original clean shape. This is the physical origin of interference and frequency-selective fading.` },
        { type: `heading`, text: `Shared-medium coordination` },
        { type: `text`, text: `If two transmitters send at once to the same receiver, their frames collide. The handwritten timeline shows station A transmitting a frame followed by a short inter-frame space and acknowledgement, while B's overlapping transmission is marked collision. More contenders mean more likely overlap.` },
        { type: `text`, text: `Contention windows control the compromise. A sender selects a random number of idle slots before transmission. After a failure, it enlarges the window, commonly by doubling from a minimum toward a maximum; after success it returns to a small window. Random waiting lowers repeated simultaneous attempts.` },
        { type: `heading`, text: `Bluetooth as a contrasting sharing method` },
        { type: `text`, text: `Bluetooth uses frequency hopping: communicating devices change among channels according to a shared pattern. The sketch labelled Bluetooth shows a band from low to high frequencies with changing use over time. Hopping helps coexist with interference by avoiding a persistently bad narrow channel, though it does not remove all interference.` },
        { type: `list`, items: [`A wireless link has finite spectrum, power, time, and receiver attention.`, `Multipath changes received strength and can make a location fingerprint distinctive.`, `Medium access rules decide who may transmit, when, and how a missing acknowledgement becomes evidence of failure.`] },
        { type: `text`, text: `Those common ideas now become concrete in Wi-Fi's distributed coordination function.` }
      ]
    },
    {
      id: `wifi-fundamentals`, title: `WiFi Fundamentals`, blocks: [
        { type: `text`, text: `Wi-Fi is the wireless local-area network most familiar to phone users. Here we connect its access-point architecture, radio bands, and collision-avoidance procedure to the shared-medium reasoning just introduced.` },
        { type: `heading`, text: `WLAN architecture and bands` },
        { type: `text`, text: `A wireless local-area network, or WLAN, links devices in a local area, commonly about 30 metres in the lecture's description. Wi-Fi primarily uses unlicensed Industrial, Scientific, and Medical bands at 2.4 gigahertz and 5 gigahertz.` },
        { type: `list`, items: [`2.4 GHz generally offers greater coverage and better penetration through solid objects.`, `5 GHz offers higher throughput over shorter distances.`, `Beamforming and multiple-input multiple-output, or MIMO, antenna techniques can improve data rate and quality of service.`] },
        { type: `text`, text: `In infrastructure mode, stations connect through an access point, or AP, which normally connects by Ethernet to a router or Internet gateway. One AP and its associated stations form a basic service set, or BSS. In ad-hoc mode, stations communicate directly without an AP; this independent basic service set is peer to peer.` },
        { type: `heading`, text: `Why Wi-Fi avoids rather than detects collisions` },
        { type: `text`, text: `Ethernet can detect a collision on a wire because voltage observations are comparable along the cable. A Wi-Fi transmitter's own strong signal overwhelms what it could hear nearby, and conditions at sender and receiver can differ. Wi-Fi therefore uses acknowledgement absence as evidence of failure, not direct collision detection.` },
        { type: `heading`, text: `DCF and CSMA/CA step by step` },
        { type: `text`, text: `The Distributed Coordination Function, or DCF, implements Carrier-Sense Multiple Access with Collision Avoidance, or CSMA/CA. First listen to the channel. If it is busy, wait. If it becomes idle for the required interval, select a random backoff counter from the contention window. Decrement it only in idle slots; freeze it when another transmission begins. Transmit when it reaches zero.` },
        { type: `text`, text: `After data, the receiver sends an acknowledgement after the Short Inter-Frame Space, or SIFS. Other contenders wait the longer DCF Inter-Frame Space, or DIFS. Since SIFS is shorter than DIFS, the acknowledgement has priority and is not accidentally crowded out. Missing ACK means retransmit and contend again.` },
        { type: `text`, text: `The Network Allocation Vector, or NAV, represents a period during which a station defers because another exchange has reserved the medium. Request To Send and Clear To Send frames can reserve an exchange and mitigate hidden terminals.` },
        { type: `heading`, text: `Contention failures` },
        { type: `text`, text: `A hidden-node pattern is B sending to A while C also sends to A; B and C cannot sense each other, so their frames collide at A. An exposed-node pattern is A sending to B while C could send to D, but C unnecessarily stays silent after sensing A. Carrier sensing reveals the sender's channel, not necessarily the receiver's.` },
        { type: `text`, text: `The backoff time equals a random contention-window value times slot duration. On a failed attempt, double the window up to its maximum; on success, reset to the minimum. A small window is aggressive and collision-prone; a large one reduces collisions but adds waiting. Equal opportunities can also make low-rate stations consume disproportionate airtime.` },
        { type: `list`, items: [`Wi-Fi is a radio data network and an indoor sensing substrate through its RSSI observations.`, `CSMA/CA uses listening, random backoff, ACKs, and optional RTS/CTS because collision detection is impractical.`, `Its performance depends on channel sharing, hidden nodes, rate diversity, and contention density.`] }
      ]
    },
    {
      id: `bluetooth-fundamentals`, title: `Bluetooth Fundamentals`, blocks: [
        { type: `text`, text: `Wi-Fi serves local-area networking; Bluetooth is designed for personal-area links such as a phone and headset, wearable, keyboard, or medical device. This chapter distinguishes its classic and Low Energy forms and its connection roles.` },
        { type: `heading`, text: `Core characteristics` },
        { type: `text`, text: `Bluetooth is standardized by the Bluetooth Special Interest Group and operates in the unlicensed 2.4 GHz band. It uses adaptive frequency hopping to improve coexistence with other 2.4 GHz technologies. A piconet is a star-shaped group in which one central coordinating device supplies clock and hopping information to connected devices.` },
        { type: `text`, text: `Diagram description: several small devices are grouped into labelled piconets. In piconet A, device A is master and B, C, and D are slaves; other piconets have their own coordinators. The important relationship is synchronized members following one controller's timing and hopping pattern, not a full mesh.` },
        { type: `heading`, text: `Classic Bluetooth` },
        { type: `text`, text: `Classic Bluetooth predates Bluetooth 4.0 and includes Basic Rate, or BR, and Enhanced Data Rate, or EDR. BR/EDR uses 79 channels of 1 megahertz across roughly 2.4 to 2.4835 GHz, uses time-division duplexing, offers 1 megabit per second BR and roughly 2 to 3 megabits per second EDR, and a classic piconet can interconnect up to seven active slaves.` },
        { type: `text`, text: `Connection begins with inquiry for discovery, then paging for connection. Connected devices can be active; sniff, waking at fixed intervals to save power; hold, sleeping for a defined interval; or park, a deeper sleep. Pairing and bonding establish authentication material so future connections can be automatic.` },
        { type: `list`, items: [`Serial Port Profile emulates serial data.`, `Human Interface Device profile supports input devices.`, `Hands-Free, Headset, Advanced Audio Distribution, and A/V Remote Control profiles specify common call and audio behaviours.`] },
        { type: `heading`, text: `Bluetooth Low Energy` },
        { type: `text`, text: `Bluetooth Low Energy, or BLE, was introduced in Bluetooth 4.0 for low-power operation. It has 40 channels of 2 megahertz from 2.402 to 2.480 GHz: three primary advertising channels, numbered 37 through 39, and 37 data channels. It uses time and frequency division mechanisms.` },
        { type: `text`, text: `BLE data rates were 1 megabit per second before Bluetooth 5. Bluetooth 5 supports 125 kilobits per second to 2 megabits per second depending on physical-layer coding; stronger coding can trade data rate for robustness.` },
        { type: `heading`, text: `Advertising and connection events` },
        { type: `text`, text: `An advertising event sends information on advertising channels without an existing connection. A broadcaster only advertises; an observer listens; a central discovers and may initiate a connection; a peripheral advertises and accepts it. In a connection event, central and peripheral exchange one or more interleaved data-packet pairs on a data channel.` },
        { type: `text`, text: `Bluetooth beacons broadcast a unique identifier via BLE. A phone application can observe the identifier and trigger location-specific information, such as store content, transport guidance, home automation, or stadium services. A beacon identifies proximity to deployed infrastructure; it does not automatically provide an exact coordinate.` },
        { type: `list`, items: [`Bluetooth trades range and power against Wi-Fi-style throughput.`, `Adaptive hopping and BLE advertising make it useful in crowded personal-device environments.`, `The same device may use Bluetooth as a low-power local pipe while another interface reaches the Internet.`] }
      ]
    },
    {
      id: `multipath-and-mpbond`, title: `Multipath and MPBond`, blocks: [
        { type: `text`, text: `A person may carry a phone, watch, tablet, or second phone, each with different Wi-Fi and cellular opportunities. MPBond asks how these personal devices can collaborate so an application sees more than one network path without having to manage every interface itself.` },
        { type: `heading`, text: `Multipath foundations` },
        { type: `text`, text: `Diagram description: a transmitter and receiver are linked by a direct radio path and multiple reflected paths from surrounding surfaces. At the receiver, those delayed copies combine. In a different networking sense, multipath means deliberately using independent end-to-end subflows, such as Wi-Fi and 4G or LTE paths, to carry one application transfer.` },
        { type: `text`, text: `The notes contrast one Wi-Fi and one 4G interface on a phone with a second personal device that also has Wi-Fi or LTE. A scheduler decides how much data each subflow should carry. This can raise throughput, survive a poor path, or reduce energy, but different path delays create reordering and buffering work.` },
        { type: `heading`, text: `MPBond's distributed architecture` },
        { type: `text`, text: `MPBond extends the multipath idea across devices. One primary device runs the client application. Helper devices have their own Internet interfaces. A local cross-device link, called a pipe, carries a portion of the primary's traffic to a helper; the helper forwards it to the Internet server through its own Wi-Fi or cellular interface. Reverse traffic follows the corresponding structure.` },
        { type: `text`, text: `Diagram description: server connects over an Internet path to a proxy, which connects to a primary device; a helper sits alongside and has a separate path to the proxy. The primary-to-helper local pipe completes a triangle. The proxy terminates or coordinates the remote side so the server need not understand the multiple personal devices.` },
        { type: `heading`, text: `Connection management and state` },
        { type: `text`, text: `The handwritten state diagram has low-power, high-power, and tail states. A radio spends energy not only while carrying bytes but also while staying awake after a transfer, exchanging control messages, or waiting for an inactivity timer. This tail energy makes a naive use of every interface wasteful.` },
        { type: `text`, text: `MPBond therefore needs cross-device connection management, buffering, packet scheduling, and policy. A scheduler must know that a helper path includes both the local pipe and the helper's Internet path, not just the helper's advertised bandwidth. It should avoid sending a chunk down a path whose delay would stall ordered delivery.` },
        { type: `heading`, text: `Completion time and scheduling` },
        { type: `text`, text: `Diagram description: the primary has its own direct path to a server; a helper has another Internet path, reached through a pipe. The notes write total time as the primary component plus the helper component and emphasize similar subflow completion times. In words: split data so the last chunk on each used path finishes at about the same time; otherwise the transfer waits for the slow straggler.` },
        { type: `text`, text: `The notes also show a pipe buffer sized from a maximum relation involving primary and helper bandwidth and delay, and label a time-to-deplete term as buffer size divided by throughput. The practical lesson is clear: buffering must absorb path-rate and delay differences, but unnecessarily large buffers increase waiting and memory use.` },
        { type: `heading`, text: `What the MPBond paper found` },
        { type: `text`, text: `MPBond was implemented on commodity Android phones and smartwatches. Its policy framework can use a watch as a cellular helper, combine two phones' cellular bandwidth, bypass per-interface public-Wi-Fi limits, place a wearable at a better signal location, or offload power-hungry LTE from a phone through an energy-efficient Bluetooth pipe.` },
        { type: `text`, text: `In real-world evaluations across workloads and network conditions, the paper reports file-download reductions of 5 to 46 percent, video-streaming bitrate improvements of 2 to 118 percent, and energy-efficiency improvement of 10 to 57 percent compared with prior collaboration frameworks. These are measured outcomes under tested conditions, not guarantees for every pair of devices.` },
        { type: `list`, items: [`Physical multipath explains fading; transport multipath deliberately uses several routes.`, `MPBond generalizes multipath transport across a primary and helpers with local pipes and a proxy.`, `Good multipath scheduling balances completion time, reordering, radio-tail energy, policy, and user resources.`] },
        { type: `text`, text: `You have now connected the whole course: sensing turns physical phenomena into measurements; localization turns measurements into place estimates; wireless networking moves those measurements and can itself become part of the sensing and positioning system.` }
      ]
    }
  ]
};
