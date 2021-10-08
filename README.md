# [sebastiansaner.ch](http://sebastiansaner.ch)

I recently learned React and thought it would be a great idea to create a personal website with it. Inspired by another website, I chose to use the threejs library to make an interactive 3d world.

### Planets
I modeled the planets using Blender3d and a low-poly assets pack for the [trees](https://brokenvector.itch.io/low-poly-tree-pack) and [rocks](https://brokenvector.itch.io/low-poly-rock-pack). The models where exported to a .gltf file, which I could import using the threejs [GLTFLoader](https://www.npmjs.com/package/three-gltf-loader).

### Using React with threejs
Combining the functionally-written React framework with the object-oriented threejs library was a bit tricky, still I think I managed to find a solution. I created a ThreeProvider React component, which instantiated all the necessary threejs classes like the renderer, scene and camera inside of a useEffect hook. The important parts e.g. the scene where made available using React contexts which could be called from any child component. This way I was able to add other models to the scene which would mount and unmount automatically, since they where tied to a seperate React component.

When planning, I was aware that libraries like [react three fiber](https://www.npmjs.com/package/@react-three/fiber) existed. While using fiber, I encountered problems while importing the 3d files into my project which ultimately led me to the decision to abandon it.