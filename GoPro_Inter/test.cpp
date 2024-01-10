#include <iostream>
#include <fstream>
#include <cstring>
#include <gphoto2/gphoto2-camera.h>

int main()
{
    Camera *camera;
    GPContext *context = gp_context_new();

    // Initialize the camera
    gp_camera_new(&camera);

    // Connect to the camera
    gp_camera_init(camera, context);

    // print camera summary
    CameraText text;
    gp_camera_get_summary(camera, &text, context);
    std::cout << text.text << std::endl;

    // Capture a photo
    CameraFilePath path;
    strcpy(path.folder, "/");
    strcpy(path.name, "captured_image.jpg");

    gp_camera_capture(camera, GP_CAPTURE_IMAGE, &path, context);

    // Add code to crop the image using OpenCV or another library

    // Example: Create and save a cropped image file using standard C++ file streams

    // Cleanup
    gp_camera_exit(camera, context);

    return 0;
}
