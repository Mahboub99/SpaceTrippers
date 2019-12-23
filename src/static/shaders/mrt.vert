#version 300 es

//TODO: Modify as needed

layout(location=0) in vec3 position;
layout(location=1) in vec4 color;
layout(location=2) in vec2 texcoord;

out vec4 v_color;
out vec2 v_texcoord;
out vec4 v_motion;

uniform mat4 M;
uniform mat4 PrevM;
uniform mat4 VP;
uniform mat4 prevVP;


void main(){
    vec4 world = M * vec4(position, 1.0f);
    vec4 previous = PrevM * vec4(position, 1.0f);
    v_motion = world - previous;
    gl_Position = VP * world;
    //prev_gl_Position = VP * previous; 
    v_color = color;
    v_texcoord = texcoord;
}